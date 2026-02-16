#!/usr/bin/env python3

"""Go Charm entrypoint."""

import typing

import ops

import paas_charm.go


class CharmCharm(paas_charm.go.Charm):
    """Go Charm service."""
    pass

if __name__ == "__main__":
    ops.main(CharmCharm)
