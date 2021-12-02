package com.group1.stagesWs.service;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.anyInt;
import static org.mockito.Mockito.anyString;
import static org.mockito.Mockito.when;

import com.group1.stagesWs.model.EvaluationEntreprise;
import com.group1.stagesWs.model.EvaluationEtudiant;
import com.group1.stagesWs.repositories.EvaluationEntrepriseRepository;
import com.group1.stagesWs.repositories.EvaluationEtudiantRepository;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class EvaluationServiceTests {

  @Mock
  private EvaluationEntrepriseRepository entrepriseEvalRepo;

  @Mock
  private EvaluationEtudiantRepository etudiantEvalRepo;

  @InjectMocks
  private EvaluationService service;

  @Test
  void testSaveEvaluationEntreprise() {
    // Arrange
    EvaluationEntreprise expected = new EvaluationEntreprise();
    expected.setId(1);
    when(entrepriseEvalRepo.save(any(EvaluationEntreprise.class))).thenReturn(expected);

    // Act
    var actual = service.save(new EvaluationEntreprise());

    // Assert
    assertThat(actual.getId()).isGreaterThan(0);
  }

  @Test
  void testSaveEvaluationEtudiant() {
    // Arrange
    EvaluationEtudiant expected = new EvaluationEtudiant();
    expected.setId(1);
    when(etudiantEvalRepo.save(any(EvaluationEtudiant.class))).thenReturn(expected);

    // Act
    var actual = service.save(new EvaluationEtudiant());

    // Assert
    assertThat(actual.getId()).isGreaterThan(0);
  }

  @Test
  void testGetAllCurrentEntrepriseEvals() {
    // Arrange
    List<EvaluationEntreprise> expected =
        List.of(new EvaluationEntreprise(), new EvaluationEntreprise(), new EvaluationEntreprise());
    when(entrepriseEvalRepo.findAllBySession(anyString())).thenReturn(expected);

    // Act
    var actual = service.getAllCurrentEntrepriseEvals();

    // Assert
    assertThat(actual.size()).isEqualTo(expected.size());
  }

  @Test
  void testGetAllCurrentEtudiantEvals() {
    // Arrange
    List<EvaluationEtudiant> expected =
        List.of(new EvaluationEtudiant(), new EvaluationEtudiant(), new EvaluationEtudiant());
    when(etudiantEvalRepo.findAllBySession(anyString())).thenReturn(expected);

    // Act
    var actual = service.getAllCurrentEtudiantEvals();

    // Assert
    assertThat(actual.size()).isEqualTo(expected.size());
  }

  @Test
  void testGetAllEntrepriseEvals() {
    // Arrange
    List<EvaluationEntreprise> expected =
        List.of(new EvaluationEntreprise(), new EvaluationEntreprise(), new EvaluationEntreprise());
    when(entrepriseEvalRepo.findAll()).thenReturn(expected);

    // Act
    var actual = service.getAllEntrepriseEvals();

    // Assert
    assertThat(actual.size()).isEqualTo(expected.size());
  }

  @Test
  void testGetAllEtudiantEvals() {
    // Arrange
    List<EvaluationEtudiant> expected =
        List.of(new EvaluationEtudiant(), new EvaluationEtudiant(), new EvaluationEtudiant());
    when(etudiantEvalRepo.findAll()).thenReturn(expected);

    // Act
    var actual = service.getAllEtudiantEvals();

    // Assert
    assertThat(actual.size()).isEqualTo(expected.size());
  }

  @Test
  void testGetEntrepriseEval() {
    // Arrange
    EvaluationEntreprise expected = new EvaluationEntreprise();
    expected.setId(1);
    when(entrepriseEvalRepo.findById(anyInt())).thenReturn(Optional.of(expected));

    // Act
    var actual = service.getEntrepriseEval(expected.getId());

    // Assert
    assertThat(actual).isPresent();
    assertThat(actual.get().getId()).isEqualTo(expected.getId());
  }

  @Test
  void testGetEtudiantEval() {
    // Arrange
    EvaluationEtudiant expected = new EvaluationEtudiant();
    expected.setId(1);
    when(etudiantEvalRepo.findById(anyInt())).thenReturn(Optional.of(expected));

    // Act
    var actual = service.getEtudiantEval(expected.getId());

    // Assert
    assertThat(actual).isPresent();
    assertThat(actual.get().getId()).isEqualTo(expected.getId());
  }
}
