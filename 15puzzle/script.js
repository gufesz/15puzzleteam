document.addEventListener('DOMContentLoaded', function () {
    const puzzleContainer = document.getElementById('puzzle-container');
    const shuffleButton = document.getElementById('shuffle-button');
    let tiles = [];

    function createPuzzle() {
        const numbers = [...Array(15).keys()].map(n => n + 1);
        numbers.push(null);

        numbers.forEach((number, index) => {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            if (number !== null) {
                tile.textContent = number;
            } else {
                tile.classList.add('empty');
            }
            tile.dataset.index = index;
            tile.addEventListener('click', handleTileClick);
            puzzleContainer.appendChild(tile);
            tiles.push(tile);
        });
    }

    function handleTileClick() {
        const emptyTile = document.querySelector('.tile.empty');
        const clickedTile = this;
        const emptyIndex = parseInt(emptyTile.dataset.index);
        const clickedIndex = parseInt(clickedTile.dataset.index);

        if (canMove(clickedIndex, emptyIndex)) {
            swapTiles(clickedTile, emptyTile);
        }
    }

    function canMove(clickedIndex, emptyIndex) {
        const rowClicked = Math.floor(clickedIndex / 4);
        const colClicked = clickedIndex % 4;
        const rowEmpty = Math.floor(emptyIndex / 4);
        const colEmpty = emptyIndex % 4;

        const isAdjacent =
            (rowClicked === rowEmpty && Math.abs(colClicked - colEmpty) === 1) ||
            (colClicked === colEmpty && Math.abs(rowClicked - rowEmpty) === 1);

        return isAdjacent;
    }


    function swapTiles(tile1, tile2) {
        const tempIndex = tile1.dataset.index;
        tile1.dataset.index = tile2.dataset.index;
        tile2.dataset.index = tempIndex;

        puzzleContainer.innerHTML = '';
        tiles.sort((a, b) => parseInt(a.dataset.index) - parseInt(b.dataset.index));
        tiles.forEach(tile => puzzleContainer.appendChild(tile));
    }

    function shuffleTiles() {
        for (let i = tiles.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [tiles[i].dataset.index, tiles[j].dataset.index] = [tiles[j].dataset.index, tiles[i].dataset.index];
        }
        puzzleContainer.innerHTML = '';
        tiles.sort((a, b) => parseInt(a.dataset.index) - parseInt(b.dataset.index));
        tiles.forEach(tile => puzzleContainer.appendChild(tile));
    }

    createPuzzle();
    shuffleButton.addEventListener('click', shuffleTiles);
});
