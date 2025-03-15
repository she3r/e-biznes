package controllers

import models.Product
import play.api.libs.json._
import play.api.mvc._

import javax.inject._

@Singleton
class ProductController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {

  implicit val productFormat: OFormat[Product] = Json.format[Product]

  var products: List[Product] = List(
    Product(1, "Product 1", 100.0),
    Product(2, "Product 2", 200.0)
  )

  def createProduct: Action[JsValue] = Action(parse.json) { request =>
    val product = request.body.as[Product]
    products = products :+ product
    Created(Json.toJson(product))
  }

  def getProducts: Action[AnyContent] = Action {
    Ok(Json.toJson(products))
  }

  def getProduct(id: Long): Action[AnyContent] = Action {
    products.find(_.id == id) match {
      case Some(product) => Ok(Json.toJson(product))
      case None => NotFound(Json.obj("error" -> "Product not found"))
    }
  }

  def updateProduct(id: Long): Action[JsValue] = Action(parse.json) { request =>
    val updatedProduct = request.body.as[Product]
    products = products.map { product =>
      if (product.id == id) updatedProduct else product
    }
    Ok(Json.toJson(updatedProduct))
  }

  def deleteProduct(id: Long): Action[AnyContent] = Action {
    products = products.filterNot(_.id == id)
    NoContent
  }
}