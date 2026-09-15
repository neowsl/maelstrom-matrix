# CAP Theorem

![](https://onetwentyseven.blog/wp-content/uploads/2017/11/null7.png)

## Introduction

In a distributed system, it is impossible to guarantee perfect, instantaneous synchronisation of data. Nodes may "lag behind" in their worldview in relation to other nodes. The CAP theorem lets us engineers reason more effectively about certain *guarantees* in our systems, as discussed in-depth below.

The acronym "CAP" stands for *Consistency*, *Availability*, and *Partition tolerance*. As the above image suggests, the CAP theorem states that in a distributed system, we can meet at most two of the three guarantees. Balancing these tradeoffs requires deep consideration of the problem space, and is of great importance when designing a system.

## Consistency

Your software may require that all clients view the same data, always. This is possible with the guarantee of consistency. Consider an online chess game. It would be unfair - and incredibly strange - if players were allowed to make moves while seeing different positions. Therefore, between moves, the clients displaying the game state must agree on the current position.

The most straightforward way to guarantee consistency is to simply block all other processes while handling data. Although easy to implement, this has the drawback of essentially turning a distributed system into a single-threaded machine, which negates the performance benefits of parallelism.

Another method of achieving consistency is to maintain a consistent map of requests and handlers, such as through sharding. In this way, multiple nodes can process requests in parallel, but a single node processes its own requests sequentially. This is the approach used by systems like Apache Kafka.

Consistency is primarily about agreement. Therefore, consistency requires a majority (a.k.a. a **quorum**) of nodes to be available to agree on the state of data. I.e. with $N$ nodes, we must have $ceil(N \/ 2)$ available nodes. This also makes gives intuition into why we can't guarantee both consistency and availability in a distributed system; by definition, consistency requires multiple participating nodes.

### Weak Consistency

Weak consistency is a form of consistency that allows stale reads. I.e. writes must be agreed upon, but reads may lag behind. This form of consistency may be preferable when high availability is required.

### Eventual Consistency

Eventual consistency is a stronger subset of weak consistency. It means that all nodes will eventually reach a consensus, usually in the absence of writes and partitions. "Eventually" means at some point in time, although there may not be an upper bound to the time - for instance, in the event of a long-lasting network outage.

### Sequential Consistency / Causal Consistency

Sequential consistency is a stronger subset of weak consistency. When a system is sequentially consistent, there must be a way to arrange the events in that system in a logical order. This idea hits the core of [Lamport clocks](lamport-clocks.md).

### Strong Consistency / Linearisability / Strict Serialisability

Strong consistency is a form of consistency that completely prohibits stale reads. With this, all clients are guaranteed the most up-to-date information, but usually at the cost of low availability and throughput.

## Availability

## Partition Tolerance

## In the Real World