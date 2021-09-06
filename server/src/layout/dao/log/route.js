export function jsonifyRouteList(routes) {
  if (!routes || routes.length === 0) {
    return '';
  }

  return JSON.stringify(
    routes.map((r) => ({ path: r.path })),
    undefined,
    4,
  );
}

export function jsonifyRoute(route) {
  if (!route || !route.path || !route.view || !route.accessGroups) {
    return '';
  }

  return JSON.stringify({
    path: route.path,
    view: route.view.key,
    accessGroups: route.accessGroups.map((g) => g.key),
  },
  undefined,
  4);
}
