'use strict';

var RenderNews = {
    listMyGroups: function(groups){

        var html = '',
            length = groups.length;

        //for(var i in groups)
        for(var i = 0; i < length; i++)
        {
            html += '<article class="myGgroup">' +
            '<img src="'+groups[i].photo_big+'" onclick="routie(\'!/news/' + groups[i].gid + '\');">' +
            '<a href="/#!/news/' + groups[i].gid + '">' + groups[i].name + '</a>' +
            '</article>';
        }

        $(document).find('#pageMyGroups > .infoTitleBlock > b.title').text('Мои группы вконтакте');
        $(document).find('#pageMyGroups > .container').html(html).scrollTop(0);
    },
    list: function(articles, info, scrollFalse){

        var html = '',
            videos = '',
            audios = '',
            images = '',
            photoNum = 0,
            src = $(document).find('audio').attr('src'),
            active = '',
            play = '',
            title = '',
            length = articles.length;

        //for(var i in articles)
        for(var i = 0; i < length; i++)
        {
            if(articles[i].attachments !== undefined && articles[i].attachments.length)
            {
                var attachments = articles[i].attachments,
                    k_length = attachments.length;

                //for(var k in attachments)
                for(var k = 0; k < k_length; k++)
                {
                    if(attachments[k].type === 'video'){
                        var v = attachments[k].video;
                        videos += '<p>'+v.title+'</p>' +
                        '<div class="videoWrap" onclick="App.news.getVideo(\''+v.vid+'\',\''+v.owner_id+'\')">' +
                        '<img src="'+v.image_big+'" alt="Видео: '+v.title+'">' +
                        '<time>'+App.manage.time(v.duration)+'</time>' +
                        '</div>';
                    }

                    else if(attachments[k].type === 'photo'){
                        photoNum++;
                        images += '<img src="'+attachments[k].photo.src_big+'" data-highres="'+attachments[k].photo.src_big+'">';
                    }

                    else if(attachments[k].type === 'audio')
                    {
                        var a = attachments[k].audio;

                        active = src === a.url ? 'active' : '';
                        play = (src === a.url && App.is.playing()) ? 'play' : '';

                        if(a.lyrics_id !== undefined)
                            title = '<span class="lyric" onclick="App.manage.lyric('+a.lyrics_id+')">'+a.title+'</span>';
                        else
                            title = '<span>'+a.title+'</span>';

                        audios +=
                            '<div class="item '+active+' '+play+'" data-aid="'+a.aid+'" data-artist="'+a.artist+'" data-title="'+a.title+'" data-url="'+a.url+'" data-owner_id="'+a.owner_id+'" data-duration="'+a.duration+'">' +
                                '<div class="item-info">' +
                                    '<i class="playPause" onclick="App.Local.playPause(this)"></i>'+
                                    '<b><a href="/#!/info/'+App.esc(a.artist)+'">'+a.artist+'</a></b>' +
                                    title +
                                '</div>'+
                                '<div class="manage">' +
                                    '<div>' +
                                        '<a id="'+a.aid+'" class="download" download="'+App.manage.title(a.artist, a.title)+'" title="Скачать" onmouseover="App.manage.downloadHover(this)" href="'+a.url+'" onclick="App.manage.download(this); return false;"></a>'+
                                        '<i class="add" title="Добавить/Восстановить" onclick="App.manage.add('+a.aid+', '+a.owner_id+', this)"></i>'+
                                        '<i class="video" title="Видео" onclick="App.youtube.getByName(\''+App.esc(a.artist+' - '+a.title)+'\')"></i>'+
                                        //'<a class="linkInfo" title="Расширенная информация об исполнителе" href="/#!/info/'+App.esc(a.artist)+'"></a>'+
                                    '</div>' +
                                    '<span class="time">'+App.manage.time(a.duration)+'</span>' +
                                '</div>'+
                            '</div>';
                    }
                }
            }

            html += '<article class="new">' +
                        '<img src="'+info.photo+'">' +
                        '<div class="wrap">' +
                        '<p>'+articles[i].text+'</p>' +
                        '<div '+(photoNum > 1 ? 'style="visibility: hidden;"' : '')+' data-layout="'+this.photoset.layout(photoNum)+'" class="images '+(photoNum > 1 ? 'photoset-grid-lightbox multi-'+photoNum : '')+'">'+images+'</div>' +
                        videos +
                        '<div class="playlist audioBlock shortPlaylist" id="'+info.gid+'-'+i+'">'+audios+'</div>'+
                            '<span class="dateArticle">'+App.manage.dateFormat(articles[i].date)+'</span>'+
                        '</div>' +
                    '</article>';

            videos = '';
            audios = '';
            images = '';
            photoNum = 0;
        }

        var pageNewsList = $(document).find('#pageNewsList');

        if(scrollFalse === undefined){
            pageNewsList.find('.infoTitleBlock > b.title').text(info.name);
            pageNewsList.find('.container').scrollTop(0).html(html);
        } else
            pageNewsList.find('.container').append(html);

        this.photoset.init();
    },
    photoset: {
        layout: function(num){

            var layout = '1';
            switch(num){
                case 2:
                    layout = 2;
                    break;
                case 3:
                    layout = 12;
                    break;
                case 4:
                    layout = 13;
                    break;
                case 5:
                    layout = 14;
                    break;
                case 6:
                    layout = 24;
                    break;
                case 7:
                    layout = 34;
                    break;
                case 8:
                    layout = 242;
                    break;
                case 9:
                    layout = 243;
                    break;
                case 10:
                    layout = 244;
                    break;
            }
            return layout;
        },
        init: function () {

            $(document).find('.photoset-grid-lightbox').photosetGrid({
                highresLinks: true,
                rel: 'withhearts-gallery',
                gutter: '1px',
                onComplete: function () {
                    $('.photoset-grid-lightbox').attr('style', '');
                    $('.photoset-grid-lightbox a').colorbox({
                        photo: true,
                        scalePhotos: true,
                        maxHeight: '90%',
                        maxWidth: '90%'
                    });
                }
            });
        }
    },
    videoNews: function(data, more){

        var html = '';
        var block = $('#pageVideoNews');
        var id;
        var el;

        for(var i in data)
        {
            el = data[i];
            id = el.snippet.resourceId.videoId;

            html += '<div class="youtubeItem">' +
                        '<div class="play" onclick="App.youtube.show(\''+id+'\')"></div>' +
                        '<img onclick="App.youtube.show(\''+id+'\')" src="'+el.snippet.thumbnails.default.url+'">' +
                        '<div class="duration">'+Youtube.utils.getDuration(el.contentDetails.duration)+'</div>' +
                        '<span title="'+el.snippet.title+'">'+el.snippet.title+'</span>' +
                    '</div>';
        }

        if(more === 0)
        {
            block.find('.youtubeItems').html(html);
            block.find('.container').scrollTop(0);
        } else
            block.find('.youtubeItems').append(html);
    }
};

({
    groups: [],
    set: {
        idApp: '4543996',
        siteUrl: window.location.origin,
        version: '5.37'
    },
    getMyGroups: function(callback){

        if(this.groups.length > 0){
            callback(this.groups);
            return;
        }

        var _this = this,
            params = {
                user_id: Cookie.getCookie('owner_id'),
                offset: 0,
                extended: 1,
                version: _this.set.version,
                access_token: Cookie.getCookie('access_token'),
                count: 1000
            };

        this.query('groups.get', params, function(data){
            data.response.shift();
            _this.groups = data.response;
            callback(data.response);
        });
    },
    getGroupInfo: function(id, callback){

        if(this.groups.length === 0){
            var _this = this;
            setTimeout(function(){
                _this.getGroupInfo(id, callback);
            }, 100);
            return;
        }

        //for(var i in this.groups)
        var length = this.groups.length;
        for(var i = 0; i < length; i++)
        {
            if(this.groups[i].gid == id)
                callback(this.groups[i]);
        }
    },
    getVideo: function(vid, owner_id, callback){

        var params = {
                videos: owner_id+'_'+vid,
                count: 1,
                offset: 0,
                extended: 1,
                owner_id: owner_id
            };

        this.query('video.get', params, function(data){
            callback(data.response[1]);
        });
    },
    getById: function(id, offset, callback){

        var _this = this,
            run = function(){
                _this.getGroupInfo(id, function(info){
                    _this.query('wall.get', params, function(data){
                        data.response.shift();
                        callback(data.response, info);
                    });
                });
            },
            params = {
                count: 20,
                offset: offset,
                owner_id: '-'+id,
                filter: 'owner'
            };

        if(this.groups.length === 0){
            this.getMyGroups(function(){
                run();
            });
            return;
        }
        run();
    },
    query: function(method, params, callback){
        var _this = this;
        $.extend(params, {
            version: _this.set.version,
            access_token: Cookie.getCookie('access_token')
        });
        $.get("https://api.vk.com/method/"+method, params, function(data) {
            if(data.error !== undefined){
                App.on.error(data.error);
                return;
            }
            if(data.response !== undefined)
                callback(data);
        },'jsonp');
    },
    init: function(name){
        delete this.init;
        window[name] = this;
    }
}).init('News');