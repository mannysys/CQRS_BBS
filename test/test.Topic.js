/**
 * Created by zhoujialin on 2016/8/21.
 */

const Topic = require('../lib/core/Topic');
const Domain = require('cqrs');
const should = require('should');

describe('Topic', function(){

    // create domain
    var domain = new Domain();
    domain.register(Topic); //ע��Topic��

    var topicId;
    it('#create', function(done){
        //����Actor��
        domain.create('Topic', {title:'mytitle',body:'mybody'}, function(err, topic){
            should.exist(topic.id);  //����Ƿ����ֵ
            topicId = topic.id;
            topic.top.should.eql(false);
            done();//�첽������done��ͬ��
        });
    });
    it('#top', function(done){
        //���������Topic�ķ���top���޸�����
        domain.call(`Topic.${topicId}.top`);
        //��ѯ����㷵������
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