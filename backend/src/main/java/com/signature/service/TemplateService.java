package com.signature.service;

import com.signature.model.Template;
import com.signature.repository.TemplateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class TemplateService {
    
    @Autowired
    private TemplateRepository templateRepository;

    public List<Template> getAllTemplates() {
        return templateRepository.findAll();
    }

    public List<Template> getPublicTemplates() {
        return templateRepository.findByIsPro(false);
    }

    public List<Template> getTemplatesByCategory(Template.Category category) {
        return templateRepository.findByCategory(category);
    }

    public Optional<Template> getTemplateById(String id) {
        return templateRepository.findById(id);
    }

    public Template saveTemplate(Template template) {
        return templateRepository.save(template);
    }

    public void deleteTemplate(String id) {
        templateRepository.deleteById(id);
    }

    public Template updateTemplate(String id, Template templateDetails) {
        Template template = templateRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Template not found"));
        
        template.setName(templateDetails.getName());
        template.setCategory(templateDetails.getCategory());
        template.setPro(templateDetails.isPro());
        template.setContent(templateDetails.getContent());
        template.setPreviewImage(templateDetails.getPreviewImage());
        
        return templateRepository.save(template);
    }
}