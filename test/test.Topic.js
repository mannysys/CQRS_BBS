/**
 * Created by zhoujialin on 2016/8/21.
 */

const Topic = require('../lib/core/Topic');
const Domain = require('cqrs');
const should = require('should');

describe('Topic', function(){

    // create domain
    var domain = new Domain();
    domain.register(Topic); //注册Topic类

    var topicId;
    it('#create', function(done){
        //创建Actor类
        domain.create('Topic', {title:'mytitle',body:'mybody'}, function(err, topic){
            should.exist(topic.id);  //检查是否存在值
            topicId = topic.id;
            topic.top.should.eql(false);
            done();//异步，不加done是同步
        });
    });
    it('#top', function(done){
        //调用领域层Topic的方法top，修改属性
        domain.call(`Topic.${topicId}.top`);
        //查询领域层返回数据
        domain.get('Topic', topicId).then(function(json){
            json.top.should.eql(true);
            done();
        });
    });
    it('#untop', function(done){
        domain.call(`Topic.${topicId}.untop`);
        domain.get('Topic', topicId).then(function(json){
            json.top.should.eql(false);
            done();
        });
    });
    it('#fine', function(done){
        domain.call(`Topic.${topicId}.fine`);
        domain.get('Topic', topicId).then(function(json){
            json.fine.should.eql(true);
            done();
        });
    });
    it('#unfine', function(done){
        domain.call(`Topic.${topicId}.unfine`);
        domain.get('Topic', topicId).then(function(json){
            json.fine.should.eql(false);
            done();
        });
    });
    it('#update', function(done){
        domain.call(`Topic.${topicId}.update`, {title:'my name is leo',body:'is me'});
        domain.get('Topic', topicId).then(function(json){
            json.title.should.eql('my name is leo');
            json.body.should.eql('is me');
            done();
        });
    });




});