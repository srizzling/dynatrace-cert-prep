# Playground drills

Do each in the work playground until it takes under 5 minutes without looking.

- [ ] Error logs per host

```
fetch logs
| filter loglevel == "ERROR"
| summarize count(), by:{dt.entity.host}
```

- [ ] CPU over time by host, then chart it

```
timeseries avg(dt.host.cpu.usage), by:{dt.entity.host}
```

- [ ] Pod CPU limits by namespace

```
timeseries sum(dt.kubernetes.container.limits_cpu), by:{k8s.namespace.name}
```

- [ ] Bizevents count by type

```
fetch bizevents
| summarize count(), by:{event.type}
```

- [ ] Add, rename, drop fields

```
fetch logs
| fieldsAdd sev = loglevel
| fieldsRename msg = content
| fieldsRemove dt.entity.host
| limit 20
```

- [ ] Notebook: + > Metric, pick a service metric, copy and adapt the generated DQL
- [ ] Dashboard named exactly ax-dashboard with a variable driving a tile filter
- [ ] Open a distributed trace, filter by service + response time, find slowest span
- [ ] Find a synthetic monitor's locations, schedule, last execution result
- [ ] Find a RUM app's key user actions and cost-control setting
- [ ] Find log ingestion rules and bizevent capture rules in Settings
- [ ] Build a workflow that notifies when a problem opens
