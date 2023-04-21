pragma solidity ^0.8.0;

contract Demo {
    address payable public player1;
    address payable public player2;
    uint256 public amount;
    bool public progress;
    uint256 private seed;

    event GameResult(address winner, uint winAmount);

    function bet() external payable {
        require(msg.value > 0, "Menshe 0");

        if (player1 == address(0)) {
            player1 = payable(msg.sender);
            amount = msg.value;
        } else {
            player2 = payable(msg.sender);
            progress = true;
            _play();
        }
    }

    function random() public returns (uint256) {
        seed = uint256(
            keccak256(
                abi.encodePacked(
                    block.timestamp,
                    block.difficulty,
                    msg.sender,
                    seed
                )
            )
        );
        return (seed % 1000000) / 1000000;
    }

    function _play() private {
        require(
            (player1 != address(0) && player2 != address(0)),
            "Players not found"
        );
        // uint256 winnerSeed = block.timestamp +
        //     block.prevrandao +
        //     (uint(keccak256(abi.encodePacked(msg.sender))) % 100);
        // uint256 randomNumber = (uint256(
        //     keccak256(abi.encodePacked(winnerSeed))
        // ) % 2);
        address payable winner = (random() == 0) ? player1 : player2;
        uint256 winBalance = address(this).balance;
        winner.transfer(winBalance);
        emit GameResult(winner, winBalance);
        _resetGame();
    }

    function _resetGame() private {
        player1 = payable(address(0));
        player2 = payable(address(0));
        amount = 0;
        progress = false;
    }
}
