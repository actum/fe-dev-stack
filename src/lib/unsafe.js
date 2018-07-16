// @flow

const unsafe = <A>(value: ?A): A => ((value: any): A)

export default unsafe
