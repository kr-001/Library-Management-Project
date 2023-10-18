<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class LoginTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function testUserLogin(): void
    {
        $response = $this->post(route('authUser'),[
            'email'=>'admin@qa2.com',
            'password'=>'12345678'
        ]);

        $response->assertStatus(302);
        $response->assertRedirect(route('dashboard'));
    }
}
