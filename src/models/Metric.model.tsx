interface Metric {
    roadmap?: {
        total: number,
        enabled: number,
        disabled: number,
        pending: number,
        completed: number,
        resource: {
            total: number,
            enabled: number,
            disabled: number
        }
    }
}

export default Metric;