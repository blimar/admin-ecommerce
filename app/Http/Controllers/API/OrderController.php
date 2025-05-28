<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\ProductVariant;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function createOrder(Request $request)
    {
        DB::beginTransaction();

        try {
            $request->validate([
                'address' => ['required', 'string'],
                'phone' => ['required', 'string'],
                'postal_code' => ['required', 'string'],
                'products.*.id' => ['required', 'string', 'exists:product_variants,id'],
                'product.*.quantity' => ['required', 'integer', 'min:1'],
            ]);

            $order = Order::create([
                'user_id' => $request->user()->id,
                'address' => $request->address,
                'phone' => $request->phone,
                'postal_code' => $request->postal_code,
            ]);

            $total = 0;

            foreach ($request->products as $variantData) {
                $variant = ProductVariant::find($variantData['id']);

                if ($variant->stock < $variantData['quantity']) {
                    throw new Exception("Product variant with id {$variant->id} is out of stock");
                }

                $variant->decrement('stock', $variantData['quantity']);

                $price = $variant->product->price * $variantData['quantity'];

                OrderItem::create([
                    'order_id' => $order->id,
                    'product_variant_id' => $variant->id,
                    'quantity' => $variantData['quantity'],
                    'price' => $price
                ]);

                $total += $price;
            }

            $order->update([
                'total' => $total
            ]);

            DB::commit();

            return response()->json([
                'data' => $order,
                'message' => 'Order create successfully',
            ], 200);
        } catch (Exception $e) {
            DB::rollBack();

            return response()->json([
                'data' => null,
                'message' => $e->getMessage(),
            ], 400);
        }
    }


    // public function payOrder(Request $request, Order $order)
    // {
    //     DB::beginTransaction();

    //     try {
    //         if ($order->status == "PAID") {
    //             throw new Exception("Order already paid");
    //         }

    //         if ($order->url != null) {
    //             return response()->json([
    //                 'data' => $order->url,
    //                 'message' => 'Generate invoice successfully',
    //             ]);
    //         }

    //         $apiKey = env('XENDIT_API_KEY');

    //         $payload = [
    //             'external_id' => (string) $order->id,
    //             'description' => "Invoice for order {$order->id}",
    //             'amount' => $order->total,
    //             'invoice_duration' => 172800, // 2 hari dalam detik
    //             'currency' => 'IDR',
    //             'reminder_time' => 1,
    //         ];

    //         // Siapkan cURL

    //         $ch = curl_init();

    //         curl_setopt($ch, CURLOPT_URL, 'https://api.xendit.co/v2/invoices');
    //         curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    //         curl_setopt($ch, CURLOPT_POST, true);
    //         curl_setopt($ch, CURLOPT_POSTFIELDS);
    //         curl_setopt($ch, CURLOPT_HTTPHEADER, [
    //             'Content-Type: application/json',
    //             'Authorization: Basic ' . base64_decode($apiKey . ':'),
    //         ]);

    //         $response = curl_exec($ch);

    //         if (curl_errno($ch)) {
    //             throw new Exception('Curl error: ' . curl_error($ch));
    //         }

    //         $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    //         curl_close($ch);

    //         if ($httpCode != 200 && $httpCode != 201) {
    //             $errorResponse = json_decode($response, true);
    //             $message = $errorResponse['message'] ?? 'Failed to create invoice';
    //             throw new Exception($message);
    //         }

    //         $result = json_decode($response, true);

    //         $order->url = $result['invoice_url'];
    //         $order->save();

    //         DB::commit();

    //         return response()->json([
    //             'data' => $result['invoice_url'],
    //             'message' => 'Generate invoice successfully',
    //         ], 200);
    //     } catch (Exception $e) {
    //         DB::rollBack();

    //         return response()->json([
    //             'data' => null,
    //             'message' => $e->getMessage(),
    //         ]);
    //     }
    // }
}
