document.addEventListener("DOMContentLoaded", () => {
    // Shared Chart Config
    Chart.defaults.color = 'rgba(255, 255, 255, 0.7)';
    Chart.defaults.font.family = "'Inter', sans-serif";

    // 1. Dashboard Revenue Chart (Line)
    const revCtx = document.getElementById('revenueChart');
    if (revCtx) {
        new Chart(revCtx, {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [{
                    label: 'Predicted Revenue ($)',
                    data: [12000, 19000, 15000, 25000],
                    borderColor: '#0d6efd',
                    backgroundColor: 'rgba(13, 110, 253, 0.2)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: { grid: { color: 'rgba(255,255,255,0.05)' } },
                    y: { grid: { color: 'rgba(255,255,255,0.05)' } }
                }
            }
        });
    }

    // 2. Dashboard Segments (Doughnut)
    const segCtx = document.getElementById('segmentChart');
    if (segCtx) {
        new Chart(segCtx, {
            type: 'doughnut',
            data: {
                labels: ['High Value', 'Window Shoppers', 'Bargain Hunters'],
                datasets: [{
                    data: [35, 45, 20],
                    backgroundColor: ['#ff6384', '#36a2eb', '#ffce56'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                cutout: '70%',
                plugins: {
                    legend: { position: 'bottom' }
                }
            }
        });
    }

    // 3. Clustering Radar Chart
    const radarCtx = document.getElementById('radarChart');
    if (radarCtx) {
        new Chart(radarCtx, {
            type: 'radar',
            data: {
                labels: ['Avg Clicks', 'Avg Price View', 'Add to Cart', 'Time on Site', 'Return Rate'],
                datasets: [
                    {
                        label: 'High Value',
                        data: [80, 90, 85, 70, 95],
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: '#ff6384',
                    },
                    {
                        label: 'Window Shoppers',
                        data: [95, 40, 20, 90, 60],
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: '#36a2eb',
                    },
                    {
                        label: 'Bargain Hunters',
                        data: [60, 20, 70, 40, 80],
                        backgroundColor: 'rgba(255, 206, 86, 0.2)',
                        borderColor: '#ffce56',
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        grid: { color: 'rgba(255,255,255,0.1)' },
                        angleLines: { color: 'rgba(255,255,255,0.1)' },
                        pointLabels: { color: 'rgba(255,255,255,0.7)' },
                        ticks: { display: false }
                    }
                }
            }
        });
    }
});
