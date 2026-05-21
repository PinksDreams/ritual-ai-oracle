// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SentimentOracle {

    int256 public sentimentScore;
    string public sentimentLabel;
    uint256 public lastUpdated;

    event SentimentUpdated(
        int256 score,
        string label,
        uint256 timestamp
    );

    function updateSentiment(
        int256 _score,
        string memory _label
    ) public {

        sentimentScore = _score;
        sentimentLabel = _label;
        lastUpdated = block.timestamp;

        emit SentimentUpdated(
            _score,
            _label,
            block.timestamp
        );
    }

    function getSentiment()
        public
        view
        returns (
            int256,
            string memory,
            uint256
        )
    {
        return (
            sentimentScore,
            sentimentLabel,
            lastUpdated
        );
    }
}