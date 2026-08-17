import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
type ProductType = {id: number, title: string, price: number}

@Controller()
export class ProductController {

  private products:ProductType[] = [
    {id: 1, title: 'book', price: 10},
    {id: 2, title: 'pen', price: 5},
    {id: 3, title: 'pencil', price: 2},
  ];


@Post('/api/products')
public createNewProduct(@Body() body: CreateProductDto) {
  const newProduct: ProductType = {
    id: this.products.length + 1,
    title: body.title,
    price: body.price,
  };

  this.products.push(newProduct);

  return this.products;
}

  @Get('/api/products')
  public getAllProducts() {
    return [
      { id: 1, name: 'Product 1' },
      { id: 2, name: 'Product 2' },
      { id: 3, name: 'Product 3' },
    ];
  }

  @Get('/api/products/:id')
  public getSingleProduct(@Param("id" ,ParseIntPipe) id : number){
    const product = this.products.find( p => p.id ===id );
    if(!product) throw new NotFoundException("product not found");
    return product; 
  }

  
  @Put('/api/products/:id')
  public updateProduct(@Param('id' ,ParseIntPipe) id:number, @Body() body:UpdateProductDto){
    const product = this.products.find( p => p.id === id );
    if(!product) throw new NotFoundException("product not found");
    console.log(body)
    return {message: 'product updated successfully with id ' + id};
    
  }

 
  @Delete('/api/products/:id')
  public deleteProduct(@Param('id',ParseIntPipe) id:number ){
    const product = this.products.find(p => p.id === id);
    if(!product) throw new NotFoundException("product not found");

    return {message: 'product deleted'};


  }


  
}
