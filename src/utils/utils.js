import {getRequest} from './api'

export const initMenu = (router, store)=> {
  if (store.state.routes.length > 0) {
    return;
  }
  getRequest("/config/sysmenu").then(resp=> {
    if (resp && resp.status == 200) {
      var fmtRoutes = formatRoutes(resp.data);
      router.addRoutes(fmtRoutes);
      store.commit('initMenu', fmtRoutes);
    }
  })
}
export const formatRoutes = (routes)=> {
  let fmRoutes = [];
  routes.forEach(router=> {
    let {
      path,
      component,
      name,
      meta,
      iconCls,
      children
    } = router;
    if (children && children instanceof Array) {
      children = formatRoutes(children);
    }
    let fmRouter = {
      path: path,
      component(resolve){
        if (component.startsWith("RoadCheck")) {
          require(['../components/roadcheck/' + component + '.vue'], resolve)
        } else if (component.startsWith("dp")) {
          require(['../components/roadcheck/dailyPatril/' + component + '.vue'], resolve)
        } else if (component.startsWith("ri")) {
          require(['../components/roadcheck/regularInspection/' + component + '.vue'], resolve)
        } else if (component.startsWith("st")) {
          require(['../components/roadcheck/specialTest/' + component + '.vue'], resolve)
        } else if (component.startsWith("RoadManage")) {
          require(['../components/roadmanage/' + component + '.vue'],resolve)
        } else if (component.startsWith("rm")) {
          require(['../components/roadmanage/' + component + '.vue'],resolve)
        } else if (component.startsWith("um")) {
          require(['../components/roadmanage/' + component + '.vue'],resolve)
        }
      },
      name: name,
      iconCls: iconCls,
      meta: meta,
      children: children
    };
    fmRoutes.push(fmRouter);
  })
  return fmRoutes;
}
