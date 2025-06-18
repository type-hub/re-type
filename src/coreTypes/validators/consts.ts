import { ValueOf } from "../../utilTypes"

export type BypassModes = {
  on: "bypass-on"
  off: "bypass-off"
}

export type BYPASS_MODES = ValueOf<BypassModes>
