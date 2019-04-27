// /*
//  * Original Theme Application JS
//  * Silper application js
//  * @original author Louie
//  * @url http://i94.me
//  * @update Ninew
//  * @date 2019.03
//  */



var home = location.href,
    s = $('#bgvideo')[0],
    Siren = {

        // 移动端菜单
        MN: function () {
            $('.iconflat').on('click', function () {
                $('body').toggleClass('navOpen');
                $('#main-container,#mo-nav,.openNav').toggleClass('open');
            });
        },

        // 移动端菜单自动隐藏
        MNH: function () {
            if ($('body').hasClass('navOpen')) {
                $('body').toggleClass('navOpen');
                $('#main-container,#mo-nav,.openNav').toggleClass('open');
            }
        },

        // 自适应窗口高度
        AH: function () {
            if (Poi.windowheight == 'auto') {
                if ($('h1.main-title').length > 0) {
                    var _height = $(window).height();
                    $('#centerbg').css({
                        'height': _height
                    });
                    $('#bgvideo').css({
                        'min-height': _height
                    });
                    $(window).resize(function () {
                        Siren.AH();
                    });
                }
            } else {
                $('.headertop').addClass('headertop-bar');
            }
        },

        // 点击事件
        CE: function () {
            // 显示&隐藏评论
            $('.comments-hidden').show();
            $('.comments-main').hide();
            $('.comments-hidden').click(function () {
                $('.comments-main').slideDown(500);
                $('.comments-hidden').hide();
            });

            // 归档页
            $('.archives').hide();
            $('.archives:first').show();
            $('#archives-temp h3').click(function () {
                $(this).next().slideToggle('fast');
                return false;
            });

            // 灯箱
            // baguetteBox.run('.entry-content', {
            //     captions: function (element) {
            //         return element.getElementsByTagName('img')[0].alt;
            //     }
            // });

            // 搜索框
            $('.js-toggle-search').on('click', function () {
                $('.js-toggle-search').toggleClass('is-active');
                $('.js-search').toggleClass('is-visible');
            });
            $('.search_close').on('click', function () {
                if ($('.js-search').hasClass('is-visible')) {
                    $('.js-toggle-search').toggleClass('is-active');
                    $('.js-search').toggleClass('is-visible');
                }
            });

            // 导航菜单
            $('#show-nav').on('click', function () {
                if ($('#show-nav').hasClass('showNav')) {
                    $('#show-nav').removeClass('showNav').addClass('hideNav');
                    $('.site-top .lower nav').addClass('navbar');
                } else {
                    $('#show-nav').removeClass('hideNav').addClass('showNav');
                    $('.site-top .lower nav').removeClass('navbar');
                }
            });

            // 过渡动画
            $("#loading").click(function () {
                $("#loading").fadeOut(500);
            });
        },

        // 显示&隐藏导航栏
        NH: function () {
            var h1 = 0,
                h2 = 50,
                ss = $(document).scrollTop();
            $(window).scroll(function () {
                var s = $(document).scrollTop();
                if (s == h1) {
                    $('.site-header').removeClass('yya');
                }
                if (s > h1) {
                    $('.site-header').addClass('yya');
                }
                if (s > h2) {
                    $('.site-header').addClass('gizle');
                    if (s > ss) {
                        $('.site-header').removeClass('sabit');
                    } else {
                        $('.site-header').addClass('sabit');
                    }
                    ss = s;
                }
            });
        },

        // Ajax加载文章
        XLS: function () {
            $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
            $('body').on('click', '#pagination a', function () {
                $(this).addClass("loading").text("");
                $.ajax({
                    type: "POST",
                    url: $(this).attr("href") + "#main",
                    success: function (data) {
                        result = $(data).find("#main .post");
                        nextHref = $(data).find("#pagination a").attr("href");
                        // In the new content
                        $("#main").append(result.fadeIn(500));
                        $("#pagination a").removeClass("loading").text("Previous");
                        if (nextHref != undefined) {
                            $("#pagination a").attr("href", nextHref);
                        } else {
                            // If there is no link, that is the last page, then remove the navigation
                            $("#pagination").html("<span>Don't have more ...</span>");
                        }
                    }
                });
                return false;
            });
        },

        // Ajax评论提交
        XCS: function () {
            var __cancel = jQuery('#cancel-comment-reply-link'),
                __cancel_text = __cancel.text(),
                __list = 'commentwrap'; //your comment wrapprer
            jQuery(document).on("submit", "#commentform", function () {
                jQuery.ajax({
                    url: Poi.ajaxurl,
                    data: jQuery(this).serialize() + "&action=ajax_comment",
                    type: jQuery(this).attr('method'),
                    beforeSend: addComment.createButterbar("机器人正在验证评论.."),
                    error: function (request) {
                        var t = addComment;
                        t.createButterbar(request.responseText);
                    },
                    success: function (data) {
                        jQuery('textarea').each(function () {
                            this.value = ''
                        });
                        var t = addComment,
                            cancel = t.I('cancel-comment-reply-link'),
                            temp = t.I('wp-temp-form-div'),
                            respond = t.I(t.respondId),
                            post = t.I('comment_post_ID').value,
                            parent = t.I('comment_parent').value;
                        if (parent != '0') {
                            jQuery('#respond').before('<ol class="children">' + data + '</ol>');
                        } else if (!jQuery('.' + __list).length) {
                            if (Poi.formpostion == 'bottom') {
                                jQuery('#respond').before('<ol class="' + __list + '">' + data + '</ol>');
                            } else {
                                jQuery('#respond').after('<ol class="' + __list + '">' + data + '</ol>');
                            }

                        } else {
                            if (Poi.order == 'asc') {
                                jQuery('.' + __list).append(data); // your comments wrapper
                            } else {
                                jQuery('.' + __list).prepend(data); // your comments wrapper
                            }
                        }
                        t.createButterbar("提交成功！");
                        cancel.style.display = 'none';
                        cancel.onclick = null;
                        t.I('comment_parent').value = '0';
                        if (temp && respond) {
                            temp.parentNode.insertBefore(respond, temp);
                            temp.parentNode.removeChild(temp)
                        }
                    }
                });
                return false;
            });
            addComment = {
                moveForm: function (commId, parentId, respondId) {
                    var t = this,
                        div, comm = t.I(commId),
                        respond = t.I(respondId),
                        cancel = t.I('cancel-comment-reply-link'),
                        parent = t.I('comment_parent'),
                        post = t.I('comment_post_ID');
                    __cancel.text(__cancel_text);
                    t.respondId = respondId;
                    if (!t.I('wp-temp-form-div')) {
                        div = document.createElement('div');
                        div.id = 'wp-temp-form-div';
                        div.style.display = 'none';
                        respond.parentNode.insertBefore(div, respond)
                    } !comm ? (temp = t.I('wp-temp-form-div'), t.I('comment_parent').value = '0', temp.parentNode.insertBefore(
                        respond, temp), temp.parentNode.removeChild(temp)) : comm.parentNode.insertBefore(respond, comm.nextSibling);
                    jQuery("body").animate({
                        scrollTop: jQuery('#respond').offset().top - 180
                    }, 400);
                    parent.value = parentId;
                    cancel.style.display = '';
                    cancel.onclick = function () {
                        var t = addComment,
                            temp = t.I('wp-temp-form-div'),
                            respond = t.I(t.respondId);
                        t.I('comment_parent').value = '0';
                        if (temp && respond) {
                            temp.parentNode.insertBefore(respond, temp);
                            temp.parentNode.removeChild(temp);
                        }
                        this.style.display = 'none';
                        this.onclick = null;
                        return false;
                    };
                    try {
                        t.I('comment').focus();
                    } catch (e) { }
                    return false;
                },
                I: function (e) {
                    return document.getElementById(e);
                },
                clearButterbar: function (e) {
                    if (jQuery(".butterBar").length > 0) {
                        jQuery(".butterBar").remove();
                    }
                },
                createButterbar: function (message) {
                    var t = this;
                    t.clearButterbar();
                    jQuery("body").append('<div class="butterBar butterBar--center"><p class="butterBar-message">' + message + '</p></div>');
                    setTimeout("jQuery('.butterBar').remove()", 3000);
                }
            };
        },

        // Ajax评论分页
        XCP: function () {
            $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
            $('body').on('click', '#comments-navi a', function (e) {
                e.preventDefault();
                $.ajax({
                    type: "GET",
                    url: $(this).attr('href'),
                    beforeSend: function () {
                        $('#comments-navi').remove();
                        $('ul.commentwrap').remove();
                        $('#loading-comments').slideDown();
                        $body.animate({
                            scrollTop: $('#comments-list-title').offset().top - 65
                        }, 800);
                    },
                    dataType: "html",
                    success: function (out) {
                        result = $(out).find('ul.commentwrap');
                        nextlink = $(out).find('#comments-navi');
                        $('#loading-comments').slideUp('fast');
                        $('#loading-comments').after(result.fadeIn(500));
                        $('ul.commentwrap').after(nextlink);
                    }
                });
            });
        },

        // 输入框特效
        IA: function () {
            POWERMODE.colorful = true; // make power mode colorful
            POWERMODE.shake = false; // turn off shake
            document.body.addEventListener('input', POWERMODE)
        },

        // 文章页面导航跟随文章滑动
        AN: function () {
            if ($('div').hasClass('post_nav')) {
                var $mulu = $('.post_nav'),
                    offset = $mulu.offset();
                $(window).scroll(function () {
                    if ($(this).scrollTop() > offset.top) {
                        var mulu_left = $mulu.offset().left,
                            mulu_w = $mulu.outerWidth();
                        $mulu.addClass('moving').css({
                            'left': mulu_left + 184 - mulu_w + 'px'
                        });
                    } else {
                        $mulu.removeClass('moving').css({
                            'left': ''
                        });
                    };
                });
                // 添加动画效果 
                $('.tooltip').click(function (e) {
                    e.preventDefault();
                    $('html,body').animate({
                        scrollTop: $(this.hash).offset().top
                    });
                });
            } else {
                return false;
            }
        },

        // 返回顶部
        GT: function () {
            var offset = 200,
                offset_opacity = 1200,
                scroll_top_duration = 700,
                $back_to_top = $('.cd-top');
            $(window).scroll(function () {
                ($(this).scrollTop() > offset) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
                if ($(this).scrollTop() > offset_opacity) {
                    $back_to_top.addClass('cd-fade-out');
                }
            });
            //smooth scroll to top
            $back_to_top.on('click', function (event) {
                event.preventDefault();
                $('body,html').animate({
                    scrollTop: 0,
                }, scroll_top_duration);
            });
        },

        //Ajax实时获取Gravatar头像
        GRT: function () {
            $("input#email").blur(function () {
                var _email = $(this).val();
                if (_email !== '') {
                    $.ajax({
                        type: 'GET',
                        data: {
                            action: 'ajax_avatar_get',
                            form: 'https://secure.gravatar.com/avatar/' + _email + '?s=42&d=mm&r=g', // Ajax路径
                            email: _email
                        },
                        success: function (data) {
                            $('.avatar_visitor').attr('src', data); // 头像标签
                        }
                    }); // end ajax
                }
                return false;
            });
        },

        // 添加一言至评论框中
        HIT: function () {
            // 调用一言API
            fetch('https://v1.hitokoto.cn')
                .then(function (res) {
                    return res.json();
                })
                .then(function (data) {
                    $("#comment").attr('placeholder', data.hitokoto + "--" + data.from);  // 输出到评论框中
                })
                .catch(function (err) {
                    console.error(err);
                })
        }

    }

// Executive function
$(function () {

    Siren.AH(); // 自适应窗口高度
    Siren.NH(); // 显示&隐藏导航栏
    Siren.AN(); // 文章导航
    Siren.GT(); // 返回顶部
    Siren.HIT(); // 添加一言
    Siren.GRT(); // Ajax获取Gravatar头像
    Siren.XLS(); // Ajax文章列表
    Siren.XCS(); // Ajax评论提交
    Siren.XCP(); // Ajax评论分页
    Siren.CE(); // 点击事件
    Siren.MN(); // 移动端菜单
    Siren.IA(); // 输入框特效

    if (Poi.pjax) {
        jQuery(document).pjax("a[target!=_top][data-pjax!='0'][class!='download'][class!='comment-reply-link']", '#page', {
            fragment: '#page',
            timeout: 8000,
        }).on('pjax:send', function () {
            $('#loading').fadeIn(300);
            Siren.MNH();
        }).on('pjax:complete', function () {
            Siren.AH();
            Siren.CE();
            Siren.AN();
            Siren.HIT();
            Siren.GRT();
            emojiInit();
            add_copyright();
            home = location.href;
            $("#loading").fadeOut(500);
            if (Poi.codelamp == 'open') {
                self.Prism.highlightAll(event)
            }; // 解决Prism.js代码高亮
            if ($('.ds-thread').length > 0) { // 解决多说问题
                if (typeof DUOSHUO !== 'undefined') {
                    DUOSHUO.EmbedThread('.ds-thread');
                } else {
                    $.getScript("//static.duoshuo.com/embed.js");
                }
            };
            document.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightBlock(block);
            }); // 解决highlight.js回调函数问题
        }).on('submit', '.search-form,.s-search', function (event) {
            event.preventDefault();
            $.pjax.submit(event, '#page', {
                fragment: '#page',
                timeout: 8000,
            });
            if ($('.js-search.is-visible').length > 0) {
                $('.js-toggle-search').toggleClass('is-active');
                $('.js-search').toggleClass('is-visible');
            }
        });
        window.addEventListener('popstate', function (e) {
            Siren.AH();
            Siren.CE();
            Siren.AN();
        }, false);
    }

    // 点赞
    $.fn.postLike = function () {
        if ($(this).hasClass('done')) {
            return false;
        } else {
            $(this).addClass('done');
            var id = $(this).data("id"),
                action = $(this).data('action'),
                rateHolder = $(this).children('.count');
            var ajax_data = {
                action: "specs_zan",
                um_id: id,
                um_action: action
            };
            $.post(Poi.ajaxurl, ajax_data,
                function (data) {
                    $(rateHolder).html(data);
                });
            return false;
        }
    };
    $(document).on("click", ".specsZan", function () {
        $(this).postLike();
    });

    // Animate
    $.fn.extend({
        animateCss: function (animationName, callback) {
            var animationEnd = (function (el) {
                var animations = {
                    animation: 'animationend',
                    OAnimation: 'oAnimationEnd',
                    MozAnimation: 'mozAnimationEnd',
                    WebkitAnimation: 'webkitAnimationEnd',
                };
                for (var t in animations) {
                    if (el.style[t] !== undefined) {
                        return animations[t];
                    }
                }
            })(document.createElement('div'));
            this.addClass('animated ' + animationName).one(animationEnd, function () {
                $(this).removeClass('animated ' + animationName);

                if (typeof callback === 'function') callback();
            });
            return this;
        }
    });

    // console.log("\n %c Kitten's Blog %c http://blog.skillcat.me \n\n","color: #fadfa3; background: #030307; padding:5px 0;","background-image: linear-gradient(90deg, #fadfa3 0%, rgb(255, 255, 255) 100%); padding:5px 0;");
    // console.log("\n %c Github %c https://github.com/Ninemeow \n\n","color: #fff; background-image: linear-gradient(90deg, rgb(47, 172, 178) 0%, rgb(45, 190, 96) 100%); padding:5px 1px;","background-image: linear-gradient(90deg, rgb(45, 190, 96) 0%, rgb(255, 255, 255) 100%); padding:5px 0;");

});

/*
 * File skip-link-focus-fix.js.
 * Helps with accessibility for keyboard only users.
 * Learn more: https://git.io/vWdr2
 */
var isWebkit = navigator.userAgent.toLowerCase().indexOf('webkit') > -1,
    isOpera = navigator.userAgent.toLowerCase().indexOf('opera') > -1,
    isIe = navigator.userAgent.toLowerCase().indexOf('msie') > -1;

if ((isWebkit || isOpera || isIe) && document.getElementById && window.addEventListener) {
    window.addEventListener('hashchange', function () {
        var id = location.hash.substring(1),
            element;
        if (!(/^[A-z0-9_-]+$/.test(id))) {
            return;
        }
        element = document.getElementById(id);
        if (element) {
            if (!(/^(?:a|select|input|button|textarea)$/i.test(element.tagName))) {
                element.tabIndex = -1;
            }
            element.focus();
        }
    }, false);
}

//调用highlight
// hljs.initHighlightingOnLoad();

//表情js	
function emojiInit() {
    $(".smli-button").click(function () {
        $("#smilies-box").fadeToggle("fast");
    });
}

//表情 
function grin(tag) {
    var myField;
    tag = ' ' + tag + ' ';
    if (document.getElementById('comment') && document.getElementById('comment').type == 'textarea') {
        myField = document.getElementById('comment');
    } else {
        return false;
    }
    if (document.selection) {
        myField.focus();
        sel = document.selection.createRange();
        sel.text = tag;
        myField.focus();
    } else if (myField.selectionStart || myField.selectionStart == '0') {
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;
        var cursorPos = endPos;
        myField.value = myField.value.substring(0, startPos) + tag + myField.value.substring(endPos, myField.value.length);
        cursorPos += tag.length;
        myField.focus();
        myField.selectionStart = cursorPos;
        myField.selectionEnd = cursorPos;
    } else {
        myField.value += tag;
        myField.focus();
    }
}
emojiInit();

//复制文章内容弹出友好提示
function add_copyright() {
    document.body.addEventListener("copy", function (e) {
        if (window.getSelection().toString().length > 30) {
            setClipboardText(e);
        } else {
            addComment.createButterbar("复制成功！<br>Copy to the clipboard success! ", 800);
        }
    });

    function setClipboardText(event) {
        event.preventDefault();
        if (event.clipboardData) {
            addComment.createButterbar("复制成功！若要转载请务必保留原文链接，申明来源，谢谢合作！<br>Copy to the clipboard success! Please declare the source, thank you.", 1000);
        }
    }
}
add_copyright();


//显示底部页面加载时间js
window.onload = function() {
	var TimeShow = document.getElementById("TimeShow");
	if(TimeShow != undefined) {
		TimeShow.innerHTML = "页面加载生成所用时间 ：" + (new Date().getTime() - t1) + " 毫秒";
	} else {
		return false;
	}
};