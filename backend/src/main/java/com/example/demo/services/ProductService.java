package com.example.demo.services;

import com.example.demo.model.Product;
import com.example.demo.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository repository;

    public List<Product> getAllProducts() {
        return repository.findAll();
    }

    public Product addProduct(Product product) {
        return repository.save(product);
    }

    public Product updateProduct(Long id, Product product) {
        Product existing = repository.findById(id).orElseThrow();
        existing.setName(product.getName());
        existing.setQuantity(product.getQuantity());
        existing.setPrice(product.getPrice());
        return repository.save(existing);
    }

    public void deleteProduct(Long id) {
        repository.deleteById(id);
    }
}