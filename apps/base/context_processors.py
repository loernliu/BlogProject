from .models import SiteInfo

def site_info(request):
    site_info = SiteInfo.objects.first()
    if site_info is None:
        raise ValueError(
            "Please add site information in background management first"
        )

    return {
        'site_name': site_info.site_name,
        'site_description': site_info.site_description,
        'keywords': site_info.keywords,
        'favicon': site_info.favicon,
        'avatar':site_info.avatar,
        'logo': site_info.logo,
        'hitokoto_status':int(site_info.hitokoto_status),
        'f_logo': site_info.f_logo,
        'site_copyright': site_info.site_copyright,
        'icp': site_info.icp,
        'analytics_code': site_info.analytics_code,
        'add_time':site_info.add_time
    }