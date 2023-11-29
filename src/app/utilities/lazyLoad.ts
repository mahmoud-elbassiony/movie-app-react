import { lazy } from "react";

export const lazyLoad = (path: string, namedExport?: string) => {
  console.log(namedExport);

  return lazy(async () => {
    const promise = await import(path);
    if (namedExport === undefined) {
      return promise;
    } else {
      return promise.then((module: any) => ({ default: module[namedExport] }));
    }
  });
};
