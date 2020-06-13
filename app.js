class ThingsThatLastedLongerThanTheConfederacy {
    constructor(opts) {
        this.opts = opts || {};

        this.year_start = 1861;
        this.year_end = 1865;
        this.year_diff = this.year_end - this.year_start;
    }

    onDisplay(result) {
        const still_lasting = !result.year_end;
        const year_end = !still_lasting ? result.year_end : (new Date()).getFullYear();
        const year_diff = parseInt(year_end, 10) - parseInt(result.year_start, 10);
        const year_times = Math.floor(year_diff / this.year_diff);
        const subtitle_times = ((() => {
            switch (year_times) {
            case 1:
                return 'longer than';
            case 2:
                return 'twice as long as';
            case 3:
                return 'thrice as long as';
            default:
                break;
            }

            return `${year_times} times longer than`
        })());

        this.opts.title.innerText = result.thing_name;
        this.opts.subtitle.innerText = `${still_lasting ? 'has ' : ''}lasted ${subtitle_times} the Confederacy`;
        this.opts.years.innerText = `(${result.year_start} - ${still_lasting ? 'preset' : result.year_end})`

        if (result.source_url) {
            this.opts.source.href = result.source_url;
            this.opts.source.className = 'source';
        }
    }

    onLoad(csv) {
        const {data} = Papa.parse(csv, {
            header: true,
            skipEmptyLines: true
        });
        const random_index = Math.floor(Math.random() * data.length);

        const result = data.slice(random_index).shift();

        this.onDisplay(result);
    }

    init() {
        const xhr = new XMLHttpRequest();

        xhr.addEventListener('load', () => {
            this.onLoad(xhr.response);
        });

        xhr.open('GET', this.opts.data);
        xhr.send(null);
    }
}

window.ThingsThatLastedLongerThanTheConfederacy = ThingsThatLastedLongerThanTheConfederacy;
