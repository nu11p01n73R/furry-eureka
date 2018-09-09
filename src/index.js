import axios from 'axios'
import Vue from 'vue'
import chart from './chart'


var stockApp = new Vue({
    el: '#stocks',

    data: {
        baseUrl: '/stocks',
        stocks: [],
        searchQuery: "",
        showSuggestions: false,
        ratios: {
            "debt_to_asset": [],
            "debt_to_equity": [],
            "ebitda_margin": [],
            "financial_leverage": [],
            "fixed_asset_turnover": [],
            "interest_coverage": [],
            "pat_margin": [],
            "receivable_turnover": [],
            "roa": [],
            "roce": [],
            "roe": [],
            "working_capital": [],
            "working_capital_turnover": [],
          }
    },

    created: function() {
        this.getAllStocks()
    },

    computed: {
        filtered: function() {
            var searchQuery = this.searchQuery.toLowerCase()
            return this.stocks.filter(
                stock => !stock.selected 
                    && searchQuery
                    && stock._name.includes(searchQuery)
                )
        },
        selected: function() {
            return this.stocks.filter(stock => stock.selected)
        },
        labels: function() {
            if (this.selected.length) {
                return this.selected[0].labels
            }

            return []
        },
    },

    methods: {
        color: function() {
            var paletts = [
                '#ffb3ba',
                '#ffdfba',
                '#ffffba',
                '#baffc9',
                '#bae1ff',
                '#a8e6cf',
                '#dcedc1',
                '#ffd3b6',
                '#ffaaa5',
                '#ff8b94',
            ]

            return paletts[Math.floor(Math.random() * paletts.length)]
        },
        datasets: function(key) {
            return this.stocks
                .filter(stock => stock.selected)
                .map(stock => {
                    return {
                        label: stock.name,
                        data: stock.ratio[key],
                        backgroundColor: this.color()
                    }
                })
        },
        updateRatios: function() {
            for (var key in this.ratios)  {
                this.ratios[key] = this.datasets(key)
            }
        },
        clicked: function(stock) {
            this.getStockData(stock)
            this.searchQuery = ''
        },
        remove: function(stock) {
            stock.selected = false
            this.updateRatios()
        },
        getAllStocks: function () {
            var vm = this
            axios.get(vm.baseUrl)
                .then(response => {
                    vm.stocks = response.data.map(stock => {
                        return Object.assign({
                            _name: stock.name.toLowerCase(),
                            selected: false,
                            labels: [],
                            ratio: {}
                        }, stock)
                    })
                })
                .catch(error => console.log(error))
        },
        getStockData: function(stock) {
            var vm = this

            if (stock.labels.length) {
                stock.selected = true
                vm.updateRatios();
                return;
            }

            axios.get(vm.baseUrl + '/' + stock.id) 
                .then(response => {
                    var data = response.data
                    stock.ratio = data.ratio
                    stock.labels = data.labels
                    stock.selected = true

                    vm.updateRatios()
                })
                .catch(error => console.log(error))
        },
    },
    components: {
        chart
    }
})