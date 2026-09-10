# Snowflake IDs

## Introduction

A [snowflake ID](https://en.wikipedia.org/wiki/Snowflake_ID) (or simply a snowflake) is a unique numeric identifier capable of being created under [AP](cap-theorem.md) guarantees. This makes snowflakes incredibly useful in distributed systems that wish to generate unique IDs. For instance, snowflakes can be used to implement [idempotency](idempotency.md).

## Implementation

The original snowflake implementation by Twitter uses a 64-bit integer, encoded as follows:

```
bits:  |------ 41 ------|-- 10 ---|--- 12 ---|
field: | ms_since_epoch | node_id | sequence |
```

Only 63 bits are used; the leading bit is set to a zero so the snowflake can be parsed as either a `u64` or an `i64`.

### Fields

`ms_since_epoch` represents the milliseconds elapsed since a known epoch datetime. 41 bits are used to store this field, meaning the value of this field rolls over after $2^41$ milliseconds, or around once every 70 years. This means that snowflakes are only truly [sortable](#chronological-ordering) within the span of 70 years (which, depending on your use case, may be sufficient).

`node_id` represents the unique ID of the generator's node. By encoding the node ID into the snowflake, we ensure there is never a key conflict between nodes. This is key (haha) to making snowflakes totally-available!

`sequence` represents the value of a [grow-only counter](grow-only-counter.md) that resets on every new millisecond. Without `sequence`, each node would consequently only be capable of generating a single unique ID every millisecond. By introducing a 12-bit `sequence` field, each node may generate $2^12 = 4096$ unique snowflakes per millisecond.

## Chronological Ordering

Since the MSBs of a snowflake integer are increasing milliseconds, snowflakes have a bonus feature of naturally being sorted by time, simply by comparing values. Therefore, a snowflake generator may be considered as a sort of quasi-[Lamport clock](lamport-clocks.md) within the error of whichever timestamping mechanism the code environment provides.

## Design Considerations

The exact bit-widths of each field may be adjusted to suit different use cases. For instance, a 10-bit `node_id` allows for up to $2^10 = 1024$ nodes. If we have fewer nodes, but each node is fairly fast, we could allocate more bits for `sequence` to allow for more snowflakes to be generated per node, per millisecond.

The standard Unix [Network Time Protocol (NTP)](https://en.wikipedia.org/wiki/Network_Time_Protocol) may also introduce "time skips" during synchronisation. Implementations should take this into consideration.
