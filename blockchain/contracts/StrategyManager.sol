// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract StrategyManager {

    uint256 public strategyCount = 0;

    struct Strategy {
        uint256 id;
        address owner;
        string name;
        string tokenPair;
        uint256 buyPrice;
        uint256 sellPrice;
        bool active;
        uint256 createdAt;
    }

    mapping(uint256 => Strategy) public strategies;

    mapping(address => uint256[]) public userStrategies;

    event StrategyCreated(
        uint256 id,
        address indexed owner,
        string name
    );

    event StrategyStatusChanged(
        uint256 id,
        bool active
    );

    modifier onlyOwner(uint256 id) {
        require(
            strategies[id].owner == msg.sender,
            "Not strategy owner"
        );
        _;
    }

    function createStrategy(
        string memory name,
        string memory tokenPair,
        uint256 buyPrice,
        uint256 sellPrice
    ) public {

        strategyCount++;

        strategies[strategyCount] = Strategy({
            id: strategyCount,
            owner: msg.sender,
            name: name,
            tokenPair: tokenPair,
            buyPrice: buyPrice,
            sellPrice: sellPrice,
            active: true,
            createdAt: block.timestamp
        });

        userStrategies[msg.sender].push(strategyCount);

        emit StrategyCreated(
            strategyCount,
            msg.sender,
            name
        );
    }

    function toggleStrategy(
        uint256 id
    )
        public
        onlyOwner(id)
    {
        strategies[id].active =
            !strategies[id].active;

        emit StrategyStatusChanged(
            id,
            strategies[id].active
        );
    }

    function getMyStrategies()
        public
        view
        returns (Strategy[] memory)
    {
        uint256[] memory ids =
            userStrategies[msg.sender];

        Strategy[] memory result =
            new Strategy[](ids.length);

        for(uint i = 0; i < ids.length; i++) {
            result[i] = strategies[ids[i]];
        }

        return result;
    }
}