<?php

namespace App\Http\Controllers;

use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Notifications\SignupActivate;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Create user
     *
     * @param  [string] name
     * @param  [string] email
     * @param  [string] password
     * @return [string] message
     * @return [array] user
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|confirmed'
        ]);

        $user = User::create([
            'name' => request('name'),
            'email' => request('email'),
            'type' => "user",
            'password' => Hash::make(request('password')),
            'activation_token' => str_random(60)
        ]);

        $language = $request->header('accept-language');

        $user->notify((new SignupActivate($user))->locale($language));
        $user->activation_sent_at = Carbon::now();
        $user->save();

        return response()->json([
            'message' => 'User created successfully!',
            'user' => $user,
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function activate($token)
    {
        $user = User::where('activation_token', $token)->first();
        if (!$user) {
            return response()->json([
                'message' => 'This activation token is invalid.'
            ], 404);
        }
        $user->active = true;
        $user->activation_token = '';
        $user->activation_sent_at = null;
        $user->email_verified_at = Carbon::now();
        $user->save();
        return $user;
    }

    public function sendActivation(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
        ]);

        return response()->json([
            'message' => 'Already sent.'
        ], 500);

        $user = User::where('email', request('email'))->first();
        if (!$user) {
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }

        if (Carbon::parse($user->activation_sent_at)->addHours(1)->gt(Carbon::now())) {
            return response()->json([
                'message' => 'Already sent.'
            ], 403);
        }

        $user->notify(new SignupActivate($user));
        $user->activation_sent_at = Carbon::now();
        $user->save();

        return response()->json([
            'message' => 'Code sent successfully!'
        ], 200);
    }
}
