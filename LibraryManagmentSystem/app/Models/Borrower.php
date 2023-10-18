<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Borrower extends Model
{
    protected $table = "borrowers";
    protected $fillable = ['order_id','bookId' , 'borrower_id' ,  'borrower_name', 'issue_date' , 'return_date' , "borrower_contact" ];
    use HasFactory;

    public static function boot()
    {
        parent::boot();

        static::creating(function ($model){
            $model->issue_date = Carbon::now();
            $model->order_id = $model->bookId.'-'.$model->borrower_id;
            $model->return_date = Carbon::parse($model->issue_date)->addDays(14);
        });
    }
    public function book(){
       return $this->belongsTo(Book::class , 'bookId' , 'isbn');
    }

}
