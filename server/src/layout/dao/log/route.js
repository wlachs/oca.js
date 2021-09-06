export function jsonifyRouteList(routes) {
  return JSON.stringify(
    routes.map((r) => ({ path: r.path })),
    undefined,
    4,
  );
}

export function jsonifyRoute(route) {
  return JSON.stringify({
    path: route.path,
    view: route.view.key,
    accessGroups: route.accessGroups.map((g) => g.key),
  },
  undefined,
  4);
}
