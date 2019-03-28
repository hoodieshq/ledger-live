// @flow
import { of } from "rxjs";
import { withDevice } from "./deviceAccess";
import { delay } from "../promise";

const flush = (deviceId: string): Promise<*> =>
  delay(1000).then(() => withDevice(deviceId)(() => of(null)).toPromise());

export default flush;
