
pragma solidity 0.5.16;

contract NftDay {
//hash stocké dans la blockchain
    string memeHash;
//Write function
    function set(string memory _memehash) public {
        memeHash = _memehash;

    }
//Read function
//obtenir la valeur du hash
    function get() public view returns (string memory) {
        return memeHash;
}

}