<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Collection;

use App\Util\Atom;
use App\Util\AppStorage;

const StoreFile = 'store.json';

function disk_store($old, $new)
{
    $newJson = json_encode($new, JSON_PRETTY_PRINT);
    Storage::disk('local')->put(StoreFile, $newJson);
}

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->app->singleton('App\Util\AppStorage', function ($app) {
            $disk_data = Storage::disk('local')->get(StoreFile);
            $data = json_decode($disk_data, true);
            $atom = new Atom($data);

            $atom->subscribe(function ($old, $new) {
                disk_store($old, $new);
            });

            return $atom;
        });
    }
}
