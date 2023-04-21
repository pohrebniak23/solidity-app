pragma solidity ^0.8.0;

contract ContractGame {
    address payable public player1;
    address payable public player2;
    uint256 public amount;
    bool public progress;
    uint256 private seed;
    uint256 public candidateCount;
    uint256 public playerId;

    struct playersList {
        uint256 id;
        address payable player;
        uint256 amount;
    }

    mapping(uint256 => playersList) players;
    uint256[] public studentIds;

    function createGame(uint256 amountValue, address addressPlayer1) public {
        playersList storage newPlayer = players[playerId];
        newPlayer.player = payable(addressPlayer1);
        newPlayer.amount = amountValue;

        studentIds.push(playerId);
        playerId++;
        candidateCount++;
    }

    function removeGame(address playerAddress) public {
        // playersList[] storage structs = players;
        playersList storage removeMe;

        for (uint256 i = 0; i < candidateCount; i++) {
            if (players[i].player == playerAddress) {
                // if this is the struct we want to delete...
                removeMe = players[i]; // save it to a variable
                players[i] = players[candidateCount - 1]; // overwrite it with the last struct
                players[candidateCount - 1] = removeMe;
                candidateCount--; // overwrite the last struct with the struct we want to delete
            }
        }
        delete players[candidateCount - 1];
        candidateCount--;
    }

    function getGame(uint256 id)
        public
        view
        returns (address payable, uint256)
    {
        playersList storage s = players[id];
        return (s.player, s.amount);
    }

    function getAllGames() public view returns (playersList[] memory) {
        playersList[] memory items = new playersList[](candidateCount);

        for (uint256 i = 0; i < candidateCount; i++) {
            playersList storage item = players[i];
            items[i] = item;
        }
        return items;
    }

    event GameResult(address winner, uint256 winAmount);

    // function bet() external payable {
    //     require(msg.value > 0, "Menshe 0");

    //     if (player1 == address(0)) {
    //         player1 = payable(msg.sender);
    //         amount = msg.value;

    //         createGame(msg.value);
    //     } else {
    //         player2 = payable(msg.sender);
    //         progress = true;
    //         _play();
    //     }
    // }

    function newGame() external payable {
        // require(msg.value > 0, "Amount is not valid");

        createGame(msg.value, msg.sender);
        // if (player1 == address(0)) {
        //     player1 = payable(msg.sender);
        //     amount = msg.value;

        //     createGame(msg.value);
        // }
    }

    // function playGame(uint256 id) external payable {

    //     // player1 = player;
    //     // player2 = payable(msg.sender);
    //     // amount = amountValue;
    //     _play(player, payable(msg.sender), amountValue);
    // }

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

    function play(uint256 id) external payable {
        (address payable player1Address, uint256 amountValue) = getGame(id);

        // require(
        //     (player1Address != address(0) && msg.sender != address(0)),
        //     "Players not found"
        // );
        address payable player2Address = payable(msg.sender);
        // uint256 winnerSeed = block.timestamp +
        //     block.prevrandao +
        //     (uint(keccak256(abi.encodePacked(msg.sender))) % 100);
        // uint256 randomNumber = (uint256(
        //     keccak256(abi.encodePacked(winnerSeed))
        // ) % 2);
        address payable winner = (random() == 0)
            ? player1Address
            : player2Address;
        uint256 winBalance = amountValue * 2;
        winner.transfer(winBalance);
        emit GameResult(winner, winBalance);
        _resetGame();
    }

    function _resetGame() private {
        player1 = payable(address(0));
        player2 = payable(address(0));
        amount = 0;
        progress = false;
        removeGame(player1);
    }
}
