<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CategoryController extends Controller
{
    public function index()
    {
        Log::info('Acessando index de categorias');
        return Category::all();
    }

    public function store(Request $request)
    {
        Log::info('Criando categoria', $request->all());

        $request->validate([
            'name' => 'required|string|max:255'
        ]);

        return Category::create($request->all());
    }

    public function show(Category $category)
    {
        Log::info('Mostrando categoria', ['id' => $category->id]);
        return $category;
    }

    public function update(Request $request, Category $category)
    {
        Log::info('Atualizando categoria', ['id' => $category->id, 'data' => $request->all()]);

        $request->validate([
            'name' => 'required|string|max:255'
        ]);

        $category->update($request->all());
        return $category;
    }

    public function destroy(Category $category)
    {
        Log::info('Deletando categoria', ['id' => $category->id]);
        $category->delete();
        return response()->json(null, 204);
    }
}
