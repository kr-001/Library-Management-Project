<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SessionTimeOut
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if(!session()->has('lastActivityTime')){
            session(['lastActivityTime'=>now()]);
        }
        if(now()->diffInMinutes(session('lastActivityTime'))>= (config('session.lifetime')-1)){
            dd(session('lastActivityTime'));
               if(auth()->check()){
                auth()->logout();
                session()->forget('lastActivityTime');
                return redirect(route('login'));
               }
        }
        session(['lastActivityTime'=>now()]);
        return $next($request);
    }
}
