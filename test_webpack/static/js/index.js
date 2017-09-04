function jsonp_reviews_list(data){
    var data_comments = data.comments;
    var comments = [];
    for(var i = 0; i < data_comments.length; i++){
        var data_comment = data_comments[i];
        if(data_comment.avgScore >= 4){
            comments.push(data_comment);
        }
    }
    var comment_html = '<ul>'
    for(var i = 0; i < comments.length; i++){
        var comment = comments[i];
        comment_html += '<li class="tb-r-comment "><div class="tb-r-buyer"><div class="tb-r-nick">' + comment.userNick + '</div><div class="tb-r-rank"><img src="http:' + comment.userLevelPic +
                '"></div></div><div class="tb-r-bd"><div class="tb-r-body"><div class="tb-r-cnt">' + comment.suggestion + '</div></div><div class="tb-r-ctl"><div class="tb-r-info">' + comment.scoreDateFormat + '</div></div></li>'
    }
    comment_html += '</ul>'
    $('#comment_table').empty();
    $('#comment_table').append(comment_html)
    $('#comment_table .tb-r-comment:odd').addClass('tb-r-odd')
}
var yql_url = 'http://query.yahooapis.com/v1/public/yql';
function getUserBills(currentPage){

    var url = 'http://fuwu.taobao.com/serv/rencSubscList.do?serviceCode=ts-1796606&currentPage=' + currentPage + '&pageCount=' + currentPage;
    $.ajax({
        url: yql_url,
        data: {
            'q': 'SELECT * FROM html WHERE url="' + url + '"',
            'format': 'html',
        },
        dataType: 'jsonp',
        success: function(response) {

            var result = response.results[0];
            result = result.replace(/<.*?>/gi, '').replace(/\n|\r|&#xd;/g, '');
            result = result.replace(/([a-zA-Z]+?|isB2CSeller):/g, '"$1":').replace(/'/g, '"');
            var obj = JSON.parse(result);
            var user_bill_html = '';
            user_bill_pageCount = obj.pageCount;
            var user_bill_data = obj.data;
            for(var i = 0; i < user_bill_data.length; i++){
                var user_bill = user_bill_data[i];
                user_bill_html += '<tr><td>' + user_bill.nick;
                if(user_bill.rateSum){
                    user_bill_html += ' <img src="http://a.tbcdn.cn/sys/common/icon/rank/b_' + user_bill.rateSum + '.gif">';
                }
                user_bill_html += '</td><td>' + user_bill.payTime + '</td><td>' + user_bill.deadline + '</td><td>' + user_bill.version + '</td></tr>'
            }
            $('.tbl-log tbody').empty();
            $('.tbl-log tbody').append(user_bill_html)
        },
    });
}

$(document).ready(function(){
    $('.tab-content').hide();
    $('.tab_bar li').click(function(){
        var index = $(this).index();
        $('.tab_bar li').removeClass('active');
        $(this).addClass('active');
        $('.tab-content').hide();
        $('.tab-content:eq(' + index + ')').show();
    })
    $('.tab_bar li:eq(0)').trigger('click')

    var pageCount = 7;
    var page_html = '';
    for(var i = 1; i <= pageCount; i++){
        page_html += '<a href="#" data-page=' + i + '>' + i + '</a>'
    }
    $('.page-bottom').append(page_html);

    /* 评价详情 */
    $('#reviews .page-bottom a').click(function(e){
        e.preventDefault();
        var currentPage = $(this).attr('data-page');
        $('#reviews .page-bottom a').removeClass('page-cur');
        $(this).addClass('page-cur')
        $.getScript('http://fuwu.taobao.com/score/query_suggest.do?service_code=ts-1796606&currentPage=' + currentPage + '&fee=1&orderType=&callback=jsonp_reviews_list');
    })
    $('#reviews .page-bottom a:eq(0)').trigger("click");

    /* 订购记录 */
    $('#user_bills .page-bottom a').click(function(e){
        e.preventDefault();
        var currentPage = $(this).attr('data-page');
        $('#user_bills .page-bottom a').removeClass('page-cur');
        $(this).addClass('page-cur')
        getUserBills(currentPage)
    })
    $('#user_bills .page-bottom a:eq(0)').trigger("click");
})
