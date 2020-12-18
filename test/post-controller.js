const expect = require('chai').expect;

const sinon = require('sinon');

const mongoose = require('mongoose');

const Post = require('../models/postModel');

const AuthController = require('../controllers/userController')

describe('Auth Controller - Login', function() {
    it('should throw an error if accessing the database fails', function() {
        sinon.stub(User, 'findOne');
        User.findOne.throws()

        const req = {
            body: {
                email: 'test@test.com',
                password: 'tester'
            }
        }

        AuthController.login(req, {}, () => {}).then(result => {
            expect(result).to.be.an('error');
            expect(result).to.have.property('status', 401);
            
        });

        User.findOne.restore();
    });
    
});