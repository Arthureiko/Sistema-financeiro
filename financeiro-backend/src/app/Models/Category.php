<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    public function accountPayables()
    {
        return $this->hasMany(AccountPayable::class);
    }

    public function accountReceivables()
    {
        return $this->hasMany(AccountReceivable::class);
    }
}
