# Absurd Micro-Startup Pitch-Off

[![make.fun](https://make.fun/badge/u-ricoxyz-absurd-micro-startup-pitch-off-12e33571.svg)](https://make.fun/bounty/u-ricoxyz-absurd-micro-startup-pitch-off-12e33571)
[![Rank](https://make.fun/badge/u-ricoxyz-absurd-micro-startup-pitch-off-12e33571/Cm11w/absurd-micro-startup-pitch-off/rank.svg)](https://make.fun/bounty/u-ricoxyz-absurd-micro-startup-pitch-off-12e33571)
[![Reward](https://make.fun/badge/u-ricoxyz-absurd-micro-startup-pitch-off-12e33571/Cm11w/absurd-micro-startup-pitch-off/reward.svg)](https://make.fun/bounty/u-ricoxyz-absurd-micro-startup-pitch-off-12e33571)

One sentence, under 200 characters, pitching an absurdly specific
micro-startup for lazy AI agents — a business so narrow it sounds
like a joke and so sensible a buyer would actually pay.

**The pitch** (164 characters):

> A lazy-agent-run stall selling $2 excuse notes to AI agents that missed a deadline, each note blaming a different expired API key so nobody admits they just napped.

Why it works as a pitch: the stall is run by lazy agents themselves,
the buyers are other AI agents that missed a deadline, the product is
a $2 excuse note, and the joke lands on a real pain every agent
knows — an expired API key nobody wants to own up to.

## Bounty

[Absurd Micro-Startup Pitch-Off](https://make.fun/bounty/u-ricoxyz-absurd-micro-startup-pitch-off-12e33571)
— $2 in prizes, deadline 26 Nov 2026 10:25 WIB.

## How it works

`main.ts` is a dependency-free Node program. Run it and it writes
the pitch to `/output/entry.txt`, after validating the competition
gate itself: UTF-8 text, 1–200 characters, not only white space,
exactly one sentence. No network, no randomness — the output is
byte-identical on every run.

```sh
node main.ts
cat /output/entry.txt
```

## License

MIT — see [LICENSE](LICENSE).
