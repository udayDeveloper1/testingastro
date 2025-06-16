export function getBasePath(path) {
    const segments = path?.split('/');
    const baseSegments = [];
    for (const segment of segments) {
        if (segment === '' || segment.startsWith(':')) continue;
        baseSegments.push(segment);
    }
    return '/' + baseSegments.join('/');
}

export function transformBlogName(blog) {
    return blog?.split(/\s+/).slice(0, 2).join('-').toLowerCase();
}

// ----------------------------------------------------------------------------------------------------

export const astrologerDetailsRedirection = (navigate, paths, id) => {
    const basePath = getBasePath(paths);
    navigate(`${basePath}/${id}`);
};

export const kundlimatchingRedirection = (navigate, id, navigationData, paths) => {
    const basePath = getBasePath(paths);
    navigate(`${basePath}`, { state: { navigationData } });
};

export const kundaliDetailsNavigate = (navigate, tab, kundliData, paths) => {
    const basePath = getBasePath(paths);
    navigate(`${basePath}/${tab}`, { state: { kundliData } });
}

/*==================================================== 
  updated horoscop module                                          
====================================================== */

export const allHoroScopeNavigation = (navigate, type, paths) => {
    const basePath = getBasePath(paths);
    navigate(`${basePath}/${type}`);
};

// type : daily-horoscope ,tomorrow-horoscope ,yesterday-horoscope , weekly-horoscope , yearly-horoscope

export const allHoroScopeDetailsNavigation = (navigate, type, name, id, paths) => {
    // const basePath = getBasePath(paths);
    const basePath = getBasePath(paths);
    navigate(`${basePath}/${type || 'daily-horoscope'}/${name}`);
};

export const blogDetailsNavigation = (navigate, paths, id, name) => {
    const basePath = getBasePath(paths);
    navigate(`${basePath}/${transformBlogName(name)}/${id}`);
};

/*==================================================== 
  Pyment module                                                    
====================================================== */

export const paymentScreenRedirection = (navigate, navigationData, paths) => {
    const basePath = getBasePath(paths);
    const queryString = new URLSearchParams(navigationData).toString();
    const base64EncodedQueryString = btoa(queryString);
    navigate(`${basePath}/${base64EncodedQueryString}`, { state: { navigationData } });
};