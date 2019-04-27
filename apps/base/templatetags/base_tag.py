from django.template import Library

from base.models import NavigationBar

register = Library()

@register.simple_tag
def navigation_bar():
    '''
    <ul id="menu-menu" class="menu">
    <li><a href="#">首页</a></li>
    <li><a href="#">分类</a>
        <ul class="sub-menu">
            <li><a href="#">Python</a></li>
            <li><a href="#">Java</a></li>
            <li><a href="#">说说</a></li>
        </ul>
    </li>
    <li><a href="#">归档</a></li>
    <li><a href="#">友链</a></li>
        <ul class="sub-menu">
            <li><a href="#">申请友链</a></li>
        </ul>
    <li><a href="#">留言板</a></li>
    </ul>

    [
    {
        name:''
        sub:[]
    },
    {
        name:''

    },
    ]
    <ul id="menu-menu" class="menu">
    for x in xx:
    <li><a href="#">x.name</a></li>
        if x.sub is not None:
        <ul class="sub-menu">
            for sub in x.sub:
            <li><a href="#">sub</a></li>
        </ul>
    </ul>

    '''
    menu =[]
    main_menu = []
    sub_menu = []
    all_navigation = NavigationBar.objects.all()
    for navigation in all_navigation:
        temp = {}
        if navigation.parents is not None:
            temp['name'] = navigation.parents
            main_menu.append(navigation.name)
        else:
            parents = navigation.parents

            sub_menu.append(navigation.name)
        # parents = navigation.parents

        menu.append(temp)
    for sub in sub_menu:
        for i in main_menu:
            if sub == i:
                    temp['sub'] = ''


