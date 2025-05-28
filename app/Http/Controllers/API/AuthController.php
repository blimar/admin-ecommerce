<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Hash;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $credential = $request->validate([
            'name' => ['required', 'string', ''],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'string'],
        ]);

        $user = User::create($credential);

        return response()->json([
            'data' => $user,
            'message' => 'register user success',
            'error' => false
        ], 200);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Invalid Credential',
                'error' => true
            ], 401);
        }

        if ($user->role !== 'CUSTOMER') {
            return response()->json([
                'message' => 'This account not a customer',
                'error' => true
            ], 403);
        }

        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'logout succcess',
            'error' => false,
        ], 200);
    }

    public function profile(Request $request)
    {
        return response()->json([
            'data' => $request->user(),
            'message' => 'get user succcess',
            'error' => false,
        ], 200);
    }
}
