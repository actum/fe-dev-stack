// @flow

import { set, lensPath } from 'ramda'
import type { GlobalConfig } from '../lib/types'

export type AsyncConfig = [string[], (config: GlobalConfig) => Promise<{}>]

const asyncConfig = (base: {}, ...promises: AsyncConfig[]) => async (
  config: GlobalConfig,
): Promise<{}> =>
  (await Promise.all(
    promises.map(async ([lens, promise]) => [lens, await promise(config)]),
  )).reduce(
    (base, [lens, resolvedConfig]) => set(lensPath(lens), resolvedConfig, base),
    base,
  )

export default asyncConfig
