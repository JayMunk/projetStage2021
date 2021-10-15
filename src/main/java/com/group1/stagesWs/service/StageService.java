package com.group1.stagesWs.service;

import com.group1.stagesWs.model.Etudiant;
import com.group1.stagesWs.model.Offre;
import com.group1.stagesWs.model.User;
import com.group1.stagesWs.model.Whitelist;
import com.group1.stagesWs.repositories.OffreRepository;
import com.group1.stagesWs.repositories.WhitelistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class StageService {

    @Autowired
    private OffreRepository offreRepository;

    @Autowired
    private WhitelistRepository whitelistRepository;

    @Autowired
    private UserService userService;

    public List<Offre> getAllOffres() {
        return offreRepository.findAll();
    }

    public List<Offre> getEtudiantOffres(String courriel) {
        Optional<User> opUser = userService.findUserByCourriel(courriel);
        if (opUser.isEmpty()) return List.of();
        User user = opUser.get();
        if (!(user instanceof Etudiant)) return List.of();
        List<Whitelist> whitelists = whitelistRepository.findAllByWhitelistedEtudiant((Etudiant)user);
        return offreRepository.findAllByVisibiliteEtudiantIsNullOrVisibiliteEtudiantIn(whitelists);
    }

    public Optional<Offre> saveOffre(Offre offre) {
        return Optional.of(offreRepository.save(offre));
    }

    public Optional<Whitelist> saveWhitelist(Whitelist whitelist) {
        return Optional.of(whitelistRepository.save(whitelist));
    }
}
