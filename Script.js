document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.sort-container');
    const resetButton = document.getElementById('reset-button');
    const sortingAlgoSelect = document.getElementById('sorting-algo');
    const startButton = document.getElementById('start-button');

    let bars = [];

    resetButton.addEventListener('click', reset);

    function reset() {
        bars = [];
        container.innerHTML = '';
        for (let i = 0; i < 50; i++) {
            const height = Math.floor(Math.random() * 300) + 20;
            const bar = document.createElement('div');
            bar.style.height = height + 'px';
            bar.style.backgroundColor = 'blue'; // Set the color of bars as you like
            container.appendChild(bar);
            bars.push(height);
        }
    }

    startButton.addEventListener('click', () => {
        const selectedAlgo = sortingAlgoSelect.value;
        startSorting(selectedAlgo);
    });

    async function startSorting(selectedAlgo) {
        if (selectedAlgo === 'bubble') {
            await bubbleSort();
        } else if (selectedAlgo === 'selection') {
            await selectionSort();
        } else if (selectedAlgo === 'insertion') {
            await insertionSort();
        }

        // Sorting is completed; you can update the display or perform other actions
        console.log("Sorting completed");
    }

    function updateDisplay() {
        const barsContainer = document.querySelector('.sort-container');
        barsContainer.innerHTML = '';

        for (let i = 0; i < bars.length; i++) {
            const bar = document.createElement('div');
            bar.style.height = bars[i] + 'px';
            bar.style.backgroundColor = 'blue'; // Set the color of bars as you like
            barsContainer.appendChild(bar);
        }
    }

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function bubbleSort() {
        let n = bars.length;
        let swapped;

        do {
            swapped = false;

            for (let i = 0; i < n - 1; i++) {
                if (bars[i] > bars[i + 1]) {
                    // Swap bars[i] and bars[i+1]
                    let temp = bars[i];
                    bars[i] = bars[i + 1];
                    bars[i + 1] = temp;

                    // Update the display to visualize the sorting
                    updateDisplay();

                    // Introduce a delay (adjust the time as needed)
                    await delay(100);
                }
            }
            n--;
        } while (swapped);
    }

    async function selectionSort() {
        let n = bars.length;

        for (let i = 0; i < n - 1; i++) {
            let minIndex = i;

            for (let j = i + 1; j < n; j++) {
                if (bars[j] < bars[minIndex]) {
                    minIndex = j;
                }
            }

            // Swap bars[i] and bars[minIndex]
            let temp = bars[i];
            bars[i] = bars[minIndex];
            bars[minIndex] = temp;

            // Update the display to visualize the sorting
            updateDisplay();

            // Introduce a delay (adjust the time as needed)
            await delay(100);
        }
    }

    async function insertionSort() {
        let n = bars.length;

        for (let i = 1; i < n; i++) {
            let key = bars[i];
            let j = i - 1;

            while (j >= 0 && bars[j] > key) {
                bars[j + 1] = bars[j];
                j--;

                // Update the display to visualize the sorting
                updateDisplay();

                // Introduce a delay (adjust the time as needed)
                await delay(100);
            }
            bars[j + 1] = key;
        }
    }

    reset(); // Initialize bars
});
