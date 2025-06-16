# grafana-prometheus-loki

## About the Project

This project demonstrates the integration of metrics collection and centralized logging in a Node.js Express server using Prometheus and Grafana Loki. The main features include:

- **Express Server with Monitoring**: Provides a simple Express.js API with endpoints for health checks and a simulated heavy workload.
- **Prometheus Metrics**: Uses the `prom-client` library to collect and expose custom and default metrics about HTTP requests, such as response times and total request count, available at the `/metrics` endpoint.
- **Grafana Loki Logging**: Integrates the `winston` logging library with the `winston-loki` transport, enabling structured logs to be sent to a Grafana Loki instance for centralized log aggregation and analysis.
- **Demonstration Endpoints**:
    - `/`: Returns a basic JSON greeting and logs the request.
    - `/slow`: Simulates a heavy workload with random delays and occasional errors, logging each request and any errors.
    - `/metrics`: Exposes Prometheus-formatted metrics for monitoring.

This setup is ideal for learning or prototyping how to combine real-time metrics and logs in a modern observability stack using Prometheus, Grafana, and Loki.
