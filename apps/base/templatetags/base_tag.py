from django.template import Library

# from base.models import NavigationBar

register = Library()

# 动态设置导航栏,预留
# @register.simple_tag
# def navigation_bar():
#     '''
#     <ul id="menu-menu" class="menu">
#     <li><a href="#">首页</a></li>
#     <li><a href="#">分类</a>
#         <ul class="sub-menu">
#             <li><a href="#">Python</a></li>
#             <li><a href="#">Java</a></li>
#             <li><a href="#">说说</a></li>
#         </ul>
#     </li>
#     <li><a href="#">归档</a></li>
#     <li><a href="#">友链</a></li>
#         <ul class="sub-menu">
#             <li><a href="#">申请友链</a></li>
#         </ul>
#     <li><a href="#">留言板</a></li>
#     </ul>
#
#     [
#     {
#         name:''
#         sub:[]
#     },
#     {
#         name:''
#
#     },
#     ]
#
#     '''
#     menu =[]
#
#     main_nav = NavigationBar.objects.filter(parents=None)
#
#     for nav in main_nav:
#         temp = {}
#         temp['name'] = nav.name
#         sub_list = NavigationBar.objects.filter(parents=nav)
#         if sub_list:
#             sub_list = [i.name for i in sub_list]
#             temp['sub'] = sub_list
#         menu.append(temp)
#     return menu
