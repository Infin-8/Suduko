class Timestamp {
    constructor(value) {

        this.value = value / 60000
        this.formatData = new Intl.NumberFormat("en-In", { minimumIntegerDigits: 2 })
        this.result = []

    }

    getHours() {

        this.result.push(Math.floor(this.value / 60))

        return this
    }

    getMins() {

        this.result.push(Math.floor(this.value - (this.result[0] * 60)))

        return this
    }

    getSecs() {

        this.result.push(Math.floor((this.value - Math.floor(this.value)) * 60))

        return this
    }

    toString() {
        return this
            .getHours()
            .getMins()
            .getSecs()
            .result
            .map(this.formatData.format)
            .reduce((a, b) => a + " : " + b)
    }
}


export default Timestamp