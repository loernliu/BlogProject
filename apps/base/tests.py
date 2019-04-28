from django.test import TestCase
from base.models import NavigationBar

# Create your tests here.
def navigation_bar():
    '''
    [
    {
        name:''
    },
    {
        name:''
        sub:[]
    },
    ]
    '''
    menu =[]

    main_nav = NavigationBar.objects.filter(parents=None)

    for nav in main_nav:
        temp = {}
        temp['name'] = nav.name
        sub_list = NavigationBar.objects.filter(parents=nav)
        if sub_list:
            sub_list = [i.name for i in sub_list]
            temp['sub'] = sub_list
        menu.append(temp)
    return menu