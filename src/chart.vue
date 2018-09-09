<template>
    <canvas 
     class="w-100"
     width="600" 
     height="400"></canvas>
</template>

<script>
import Chart from 'chart.js'

export default {
    props: [
        'title',
        'labels',
        'datasets'
    ],
    data: function() {
        return {
            chart: null
        }
    },
    watch: {
        datasets: function() {
            this.chart.data.labels = this.labels
            this.chart.data.datasets = this.datasets
            this.chart.update()
        }
    },
    mounted: function() {
        this.chart = new Chart(this.$el, {
            type: 'horizontalBar',
            data: {
                labels: [],
                datasets: []
            },
            options: {
                responsive: false,
                title: {
                    display: true,
                    text: this.title
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });

        this.chart.update()
    },
}
</script>

