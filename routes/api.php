<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['prefix' => 'users', 'middleware' => 'api'], function () {
    Route::post('signup', 'UserController@store');
    Route::get('activate/{token}', 'UserController@activate');
    Route::post('activate', 'UserController@sendActivation');

    Route::group(['middleware' => 'auth:api'], function () {
        Route::get('index', 'UserController@index');
        Route::get('show', 'UserController@show');
        Route::post('update', 'UserController@update');
    });
});

Route::group(['prefix' => 'auth', 'middleware' => 'api'], function () {
    Route::post('login', 'AuthController@login');

    Route::group(['middleware' => 'auth:api'], function () {
        Route::get('logout', 'AuthController@logout');
        Route::get('user', 'AuthController@user');
    });
});

Route::group(['namespace' => 'auth', 'middleware' => 'api', 'prefix' => 'password'], function () {
    Route::post('create', 'PasswordResetController@create');
    Route::get('find/{token}', 'PasswordResetController@find');
    Route::post('reset', 'PasswordResetController@reset');
});
